export default function numberValidator(event) {
	let re = /^[0-9]*$/;
	let val = re.exec(event.target.value);

	if (val !== null) {
		event.target.value = val[0];
		gameEditData[event.target.name] = event.target.value;
		setGameEditData({ ...gameEditData });
	} else {
		event.target.value = gameEditData[event.target.name];
	}
}
