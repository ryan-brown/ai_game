var Number = function(value, color) {
	this.value = value;
	if (color == 0) {
		this.color = "#FF0000";
	}
	else if (color == 1) {
		this.color = "#00FF00";
	}
	else {
		this.color = "#0000FF";
	}
}