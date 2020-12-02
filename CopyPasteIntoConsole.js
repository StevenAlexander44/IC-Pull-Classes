async function main () {
	const classes = await fetch(
		'/campus/resources/portal/roster?_enableScheduleForGrades=true', 
		{headers: {'Accept': 'application/json, text/plain, */*', 'Cache-Control': 'no-cache'}})
		.then(r => r.json())
	for (const period of classes) {
		const {periods: [{ periodID }], terms: [{ termName }]} = await fetch(
			`/campus/resources/portal/section/${period.sectionID}?_expand=course-school&_expand=terms&_expand=periods-periodSchedule&_expand=teacherPreference&_expand=room&_expand=teachers`,
			{headers: {'Accept': 'application/json, text/plain, */*','Cache-Control': 'no-cache'}})
		.then(r => r.json())
		delete period.sectionID
		period.period = periodID
        	period.term = termName
	}
	return classes
	.sort((a, b) => +a.period - +b.period)
	.sort((a, b) => +a.term - +b.term)
	.map(({ term, period, courseName, teacherDisplay }) => `Term ${term} | PeriodID ${period}: ${teacherDisplay} / ${courseName}`)
	.join('\n')
}

main()
	.then(output => {
		console.log(output)
		alert(output)
	})
