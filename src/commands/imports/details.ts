import Command, { Flags } from '../../base'
import Table from 'cli-table3'
import { clOutput, clColor } from '@commercelayer/cli-core'




export default class ImportsDetails extends Command {

	static description = 'show the details of an existing import'

	static aliases = ['imp:details']

	static examples = [
		'$ commercelayer imports:details <import-id>',
		'$ cl imp:details <import-id> -i',
		'$ cl imp:details <import-id> -i -l',
	]

	static flags = {
		...Command.flags,
		inputs: Flags.boolean({
			char: 'i',
			description: 'show input items associated with the import',
		}),
		logs: Flags.boolean({
			char: 'l',
			description: 'show warning and error logs related to the import process',
		}),
	}

	static args = [
		{ name: 'id', description: 'unique id of the import', required: true, hidden: false },
	]


	async run() {

		const { args, flags } = await this.parse(ImportsDetails)

		const id = args.id

		const cl = this.commercelayerInit(flags)


		try {

			const imp = await cl.imports.retrieve(id)

			const table = new Table({
				// head: ['ID', 'Topic', 'Circuit state', 'Failures'],
				colWidths: [23, 67],
				colAligns: ['right', 'left'],
				wordWrap: true,
			})

			const exclude = ['type', 'reference', 'reference_origin', 'metadata', 'inputs', 'warnings_log', 'errors_log']

			// let index = 0
			table.push(...Object.entries(imp)
				.filter(([k]) => !exclude.includes(k))
				.map(([k, v]) => {
					return [
						{ content: clColor.table.key.blueBright(k), hAlign: 'right', vAlign: 'center' },
						formatValue(k, v),
					]
				}))

			if (imp.metadata?.group_id) table.splice(1, 0, [clColor.table.key.cyanBright('group_id'), clColor.api.id(String(imp.metadata.group_id))])

			this.log()
			this.log(table.toString())
			this.log()

			if (flags.inputs) this.showInputs(imp.inputs)
			if (flags.logs) this.showLogs(imp.warnings_log, imp.errors_log)

			return imp

		} catch (error) {
			this.handleError(error, flags, id)
		}

	}


	showInputs(inputs?: Array<object>): void {

		const imp = inputs || []

		this.log()
		this.log(clColor.cyanBright(`${clColor.bold('INPUTS')}\t[ ${imp.length} record${imp.length === 1 ? '' : 's'} ]`))

		if (imp.length > 0) {
			const table = new Table({ colWidths: [90], wordWrap: true })
			table.push(...(inputs || []).map(i => [clOutput.printObject(i, { width: 86 })]))
			this.log(table.toString())
		}

		this.log()

	}


	showLogs(warningLog?: object, errorLog?: object): void {

		const tableOptions: Table.TableConstructorOptions = {
			head: ['Code', 'Message'],
			colWidths: [15, 75],
			// colAligns: ['center', 'left'],
			wordWrap: true,
			style: {
				head: ['brightCyan'],
				compact: false,
			},
		}

		// Warnings
		const warnings = warningLog ? Object.keys(warningLog).length : 0

		this.log()
		this.log(clColor.msg.warning.yellowBright(`${clColor.bold('WARNING LOG')}\t[ ${warnings} warning${warnings === 1 ? '' : 's'} ]`))

		if (warnings > 0) {
			const table = new Table(tableOptions)
			table.push(...Object.entries(warningLog || {})
				.map(([k, v]) => [{ content: ((k && (k !== 'unknown')) ? k : ''), vAlign: 'center' }, clOutput.printObject(v) as any]))
			this.log(table.toString())
		}

		this.log()


		// Errors
		const errors = errorLog ? Object.keys(errorLog).length : 0

		this.log()
		this.log(clColor.msg.error(`${clColor.bold('ERROR LOG')}\t[ ${errors} error${errors === 1 ? '' : 's'} ]`))

		if (errors > 0) {
			const table = new Table(tableOptions)
			table.push(...(Object.entries(errorLog || {}))
				.map(([k, v]) => [{ content: ((k && (k !== 'unknown')) ? k : ''), vAlign: 'center' }, clOutput.printObject(v) as any]))
			this.log(table.toString())
		}

		this.log()

	}

}


const statusColor = (status: string): string => {

	if (!status) return ''

	switch (status.trim()) {
		case 'interrupted': return clColor.msg.error(status)
		case 'completed': return clColor.msg.success(status)
		case 'pending':
		case 'in_progress':
		default: return status
	}

}


const formatValue = (field: string, value: string): any => {

	if (field.endsWith('_date') || field.endsWith('_at')) return clOutput.localeDate(value)

	switch (field) {

		case 'id': return clColor.api.id(value)
		case 'resource_type': return clColor.magentaBright(value)
		case 'topic': return clColor.magenta(value)
		case 'status': return statusColor(value)
		case 'warnings_count': return clColor.msg.warning(value)
		case 'errors_count': return clColor.msg.error(value)
		case 'destroyed_count': return clColor.cyanBright(value)
		case 'processed_count': return clColor.msg.success(value)
		case 'metadata': {
			const t = new Table({ style: { compact: false } })
			t.push(...Object.entries(value).map(([k, v]) => {
				return [
					{ content: clColor.cyan.italic(k), hAlign: 'left', vAlign: 'center' },
					{ content: clColor.cli.value((typeof v === 'object') ? JSON.stringify(v) : v) } as any,
				]
			}))
			return t.toString()
		}
		default: {
			if ((typeof value === 'object') && (value !== null)) return JSON.stringify(value, undefined, 4)
			return String(value)
		}

	}

}
