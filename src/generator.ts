import puppeteer from 'puppeteer'

import type { PDFOptions } from 'puppeteer'

const defaultOptions: PDFOptions = {
	margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
	printBackground: true,
	format: 'A4',
	timeout: 0
}

export default async (html: URL | Buffer, options: Omit<PDFOptions, 'path'> = defaultOptions) => {
	const browser = await puppeteer.launch({ headless: 'new' })
	const page = await browser.newPage()

	try {
		if (html instanceof Buffer) {
			await page.setContent(html.toString(), { waitUntil: 'domcontentloaded' })
		} else {
			await page.goto(html.toString(), { waitUntil: 'networkidle0' })
		}

		await page.emulateMediaType('screen')

		const pdf = await page.pdf(options)

		return pdf
	} catch (error) {
		throw error
	} finally {
		await browser.close()
	}
}
