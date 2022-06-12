async function main () {
	const classes = await fetch(
		'/campus/resources/portal/roster?_enableScheduleForGrades=true',
		{headers: {'Accept': 'application/json, text/plain, */*', 'Cache-Control': 'no-cache'}}
	)
	.then(r => r.json())
	for (const period of classes) {
		const {periods: [{ periodID }], terms: [{ termName }], periods: [{ name }], periods: [{ periodSchedule }]} = await fetch(
			`/campus/resources/portal/section/${period.sectionID}?_expand=course-school&_expand=terms&_expand=periods-periodSchedule&_expand=teacherPreference&_expand=room&_expand=teachers`,
			{headers: {'Accept': 'application/json, text/plain, */*','Cache-Control': 'no-cache'}}
		)
		.then(r => r.json())
		period.id = periodID
		period.term = termName
		period.day = periodSchedule.name
		period.number = name
	}
	return classes
	.sort((a, b) => +a.id - +b.id)
	.sort((a, b) => +a.term - +b.term)
	.map(({ term, day, number, teacherDisplay, courseName }) => `Term ${term} | ${day} ${number}: ${teacherDisplay} / ${courseName}`)
	.join('\n')
}
main().then(output => {
	console.log(output)
	alert(output)
	document.body.innerText = output
})
