function jqgrouper(catElemName, assignments, all){
	var part = this;
	part.catElemName = catElemName;
	part.all = all;
	part.rmap = {};
	initAssign = {};

	this.curCat = null;
	this.toggle = function(){
		var t = $(this);
		/* If target assigned to category, then move to unassigned. */
		if(t.parent().hasClass(part.catClass)){
			var m = part.rmap[$(this).children().first().attr("id")];
			$(this).remove().appendTo($(m));
			$(this).dblclick(part.toggle);
			return;
		}

		if(!part.curCat)
			return;
		$(this).remove().appendTo(part.curCat);
		$(this).dblclick(part.toggle);
	}

	t = $(catElemName);
	t.empty();
	for(var i in assignments){
		var cat = assignments[i];
		var elem =
			$("<li><span class=\"assign_jqgrouper\">"+cat.name+"</span></li>");

		/* Select/Unselect. */
		$(elem).click(function(){
			if(part.curCat){
				var s = $(this).children().first().hasClass(part.chosenClass);
				part.curCat.prev().children().first().removeClass(part.chosenClass);
				if(s){
					part.curCat = null;
					return;
				}
			}

			part.curCat = $(this).next();
			$(this).children().first().addClass(part.chosenClass);
		});

		var assigned = $("<ul id=\""+ i +"\" class=\""+ part.catClass +"\"></ul>");
		for(var k = 0; k < cat.assigned.length; ++k){
			var item = cat.assigned[k];
			var p = $("<li><span id=\""+ item.id +"\" class=\"assign_jqgrouper\">"
					+ item.name + "</span></li>");
			p.dblclick(part.toggle);
			assigned.append(p);
			initAssign[item.id] = cat;
		}
		t.append(elem).append(assigned);
	}

	for(var m in part.all){
		var all = part.all[m];
		t = $(m);
		for(var p = 0; p < all.length; ++p){
			var x = all[p];
			part.rmap[x.id] = m;
			if(x.id in initAssign)
				continue;
			var elem =
				$("<li><span id=\""+ x.id +"\" class=\"assign_jqgrouper\">"+ x.name +"</span></li>");
			elem.dblclick(part.toggle);
			t.append(elem);
		}
	}

	return this;
}

jqgrouper.prototype.getAssignments = function(){
	var cats = $(this.catElemName +" ."+ this.catClass);
	var data = {};
	for(var i = 0; i < cats.length; ++i){
		var s = cats[i];
		var t = $(s).find("span");
		var arr = [];
		for(var k = 0; k < t.length; ++k)
			arr.push($(t[k]).attr("id"));
		data[$(s).attr("id")] = arr;
	}

	return data;
}

jqgrouper.prototype.catClass = "cat_jqgrouper";
jqgrouper.prototype.targetClass = "target_jqgrouper";
jqgrouper.prototype.chosenClass = "chosen_jqgrouper";
jqgrouper.prototype.assignClass = "assign_jqgrouper";
