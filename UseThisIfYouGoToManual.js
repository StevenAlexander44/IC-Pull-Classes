javascript:(()=>{
const classes = await fetch(
	'/campus/resources/portal/roster?_enableScheduleForGrades=true',
	{headers: {'Accept': 'application/json, text/plain, */*', 'Cache-Control': 'no-cache'}}
).then(r => r.json())
for (const period of classes) {
	const {periods: [{ periodID }], terms: [{ termName }], periods: [{ name }], periods: [{ periodSchedule }]} = await fetch(
		`/campus/resources/portal/section/${period.sectionID}?_expand=course-school&_expand=terms&_expand=periods-periodSchedule&_expand=teacherPreference&_expand=room&_expand=teachers`,
		{headers: {'Accept': 'application/json, text/plain, */*','Cache-Control': 'no-cache'}}
	).then(r => r.json())
	period.id = periodID
	period.term = termName
	period.day = periodSchedule.name
	period.number = name
}
output = classes.sort((a, b) => +a.id - +b.id).sort((a, b) => +a.term - +b.term)
arrput = output.map(({ term, day, number, teacherDisplay, courseName }) => ['Term: ' + term, day + number, teacherDisplay, courseName])
output = output.map(({ term, day, number, teacherDisplay, courseName }) => `Term ${term} | ${day} ${number}: ${teacherDisplay} / ${courseName}`).join('\n')
console.log(output)
alert(output)
var table = '<table>'
for (const clas of arrput) {
	table += '<tr>'
	for (const thing of clas) {
		table += `<td>${thing}</td>`
	}
	table += '</tr>'
}
table += '</table>'
document.body.innerHTML = table
document.head.innerHTML = ''
document.title = 'Schedule'
})();
