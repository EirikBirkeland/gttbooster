const debug = require('cth-debug')(__filename)

function tableifyMap(ele, i) {
   if (ele.length === 2) {
      return (
         <tr key={i}>
            <td key="0">{ele[0]}</td>
            <td key="1">{ele[1]}</td>
         </tr>
      )
   } else if (!ele.length) {
      return (
         <tr key={i}>
            <td>{ele}</td>
         </tr>
      )
   }
   const err = 'Unhandled exception! An array of invalid size was supplied to tableElements'
   debug(err)
}

export default tableifyMap
