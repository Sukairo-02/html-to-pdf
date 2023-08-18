import generator from 'generator'
import fs from 'fs'

const start = async () => {
	try {
		//const file = fs.readFileSync('input.html')
		//const pdf = await generator(file)

		const address = new URL('https://docs.aws.amazon.com/cloudformation/index.html')
		const pdf = await generator(address)

		fs.writeFileSync('output.pdf', pdf)
	} catch (e) {
		console.error(e)
	}
}

start()
