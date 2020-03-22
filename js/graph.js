document.addEventListener("DOMContentLoaded", function(){
	// Create liteChart.js Object
	settings = {};
	let d = new liteChart("chart", settings);

	// Set labels
	d.setLabels(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);

	// Set legends and values
	d.addLegend({"name": "Начисления", "stroke": "#ba9595", "fill": "#fff", "values": [100, 200, 450, 400, 500, 300, 700]});
	
	// Inject chart into DOM object
	let div = document.getElementById("your-id");
	d.inject(div);

	// Draw
	d.draw();
});