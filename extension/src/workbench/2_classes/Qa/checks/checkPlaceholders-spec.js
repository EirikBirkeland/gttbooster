import test from 'ava'
import checkPlaceholders from './checkPlaceholders'

const source1 = '{0/}{1/} of existing backup data will be deleted.{2/}{3/}This will stop all future {4/} backups.{2/}'
const target1 = '{0/}{1/} av eksisterende sikkerhetskopidata blir slettet.{2/}{3/}Dette stanser alle fremtidige {4/}-backuper.{2/}'

const source2 = '{0/}{1/} of existing backup data will be deleted.{3/}{2/}This will stop all future {4/} backups.{2/}'
const target2 = '{0/}{1/} av eksisterende sikkerhetskopidata blir slettet.{2/}{3/}Dette stanser alle fremtidige {4/}-backuper.{2/}'

const source3 = '{0/}{1/} of existing backup data will be deleted.{2/}{3/}This will stop all future {4/} backups.{2/}'
const target3 = '{1/}{0/} of existing backup data will be deleted.{2/}{3/}This will stop all future {4/} backups.{2/}'

const source4 = '{0/}{1/} of existing backup data will be deleted.{2/}{3/}This will stop all future {4/} backups.{2/}'
const target4 = '{1/} of existing backup data will be deleted.{2/}{3/}This will stop all future {4/} backups.{2/}'

test('', (t) => {

   t.is(null, checkPlaceholders(source1, target1))

})

test('', (t) => {

   t.is('Placeholder order invalid', checkPlaceholders(source2, target2))

})

test('', (t) => {

   t.is('Placeholder order invalid', checkPlaceholders(source3, target3))

})

test('', (t) => {

   t.is('Placeholder error [missing PHs, too many PHs or possibly invalid PH order.]', checkPlaceholders(source4, target4))

})
