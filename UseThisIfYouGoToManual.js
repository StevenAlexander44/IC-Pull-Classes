async function main () {
	const domain = 'https://jcpsky.infinitecampus.org/campus/resources/portal/'
	const classes = await fetch(domain + 'roster?_enableScheduleForGrades=true', {headers: {'Accept': 'application/json, text/plain, */*','Cache-Control': 'no-cache'}})
		.then(r => r.json())
	for (const period of classes) {
		const {
			periods: [{ name }],
			periods: [{ periodSchedule }],
			periods: [{ periodID }]
		} = await fetch(domain + `section/${period.sectionID}?_expand=course-school&_expand=terms&_expand=periods-periodSchedule&_expand=teacherPreference&_expand=room&_expand=teachers`, {headers: {'Accept': 'application/json, text/plain, */*','Cache-Control': 'no-cache'}})
			.then(r => r.json())
		delete period.sessionID
		period.period = name
		period.block = periodSchedule.name
		period.sort = periodID
	}
	return classes
		.sort((a, b) => +a.sort - +b.sort)
		.map(({ block, period, teacherDisplay, courseName }) => `${block} ${period}: ${teacherDisplay} / ${courseName}`)
		.join('\n')
}

main()
	.then(output => {
		console.log(output)
		alert(output)
	})
