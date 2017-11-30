export default function handleError(type) {

   if (type === 'optionName') {

      throw new Error('CTH: invalid optionName specified.')

   } else {

      throw new Error('General error.')

   }

}
