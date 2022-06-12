const classes = await fetch(
	'/campus/resources/portal/roster?_enableScheduleForGrades=true', 
	{headers: {'Accept': 'application/json, text/plain, */*', 'Cache-Control': 'no-cache'}}
).then(r => r.json())
for (const period of classes) {
	const {periods: [{ periodID }], terms: [{ termName }]} = await fetch(
		`/campus/resources/portal/section/${period.sectionID}?_expand=course-school&_expand=terms&_expand=periods-periodSchedule&_expand=teacherPreference&_expand=room&_expand=teachers`,
		{headers: {'Accept': 'application/json, text/plain, */*','Cache-Control': 'no-cache'}}
	).then(r => r.json())
	period.id = periodID
	period.term = termName
}
output = classes
	.sort((a, b) => +a.id - +b.id)
	.sort((a, b) => +a.term - +b.term)
	.map(({ term, id, courseName, teacherDisplay }) => `Term ${term} | PeriodID ${id}: ${teacherDisplay} / ${courseName}`)
	.join('\n')
console.log(output)
alert(output)
document.body.innerText = output
