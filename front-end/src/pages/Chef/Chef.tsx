import Classes from './Chef.module.scss';

const Chef = () => {
  const tablenNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12];
  const rows: number[][] = [];
  for (let i = 0; i < tablenNumbers.length; i += 3) {
    rows.push(tablenNumbers.slice(i, i + 3)); 
  }
  return (
    <div>
      <h2>Chef...</h2>
       <div>Notifications</div>
      <table className={Classes.tableStyle}>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((number) => (
                <td key={number} className={Classes.tableRow}>
                  {number}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Chef
