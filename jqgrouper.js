function jqgrouper(catElemName, targetElemName, assignments, unassigned){
	var part = this;

	this.curCat = null;
	this.toggle = function(){
		var t = $(this);
		/* If target assigned to category, then move to unassigned. */
		if(t.parent().hasClass(part.catClass)){
			$(this).remove().appendTo($(part.targetElemName));
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
			var t = cat.assigned[k];
			var p = $("<li><span id=\""+ t.id +"\" class=\"assign_jqgrouper\">"
					+ t.name + "</span></li>");
			p.dblclick(toggle);
			assigned.append(p);
		}
		t.append(elem).append(assigned);
	}

	t = $(targetElemName);
	for(var p in assigned){
		var x = assigned[p];
		var elem =
			$("<li><span id=\""+ x.id +"\" class=\"assign_jqgrouper\">"+ x.name +"</span></li>");
		elem.dblclick(toggle);
		t.append(elem);
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
