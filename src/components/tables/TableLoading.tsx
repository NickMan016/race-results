interface PropsTableLoading {
  image?: boolean;
  columns: number;
}

export const TableLoading = ({ image = false, columns }: PropsTableLoading) => {
  const filas: number[] = [];
  const columnas: number[] = [];
  for (let index = 0; index < 10; index++) {
    filas.push(index);
  }

  for (let index = 0; index < columns; index++) {
    columnas.push(index);
  }

  return (
    <>
      {filas.map((_, index) => (
        <tr key={index}>
          {image && (
            <td className="w-1/12">
              <div className="animate-skeleton bg-gray-400 h-8 w-8 m-auto rounded-full dark:bg-gray-700"></div>
            </td>
          )}
          {columnas.map((_, index) => (
            <td className="py-4 pl-2 pr-4" key={index}>
              <div className="animate-skeleton bg-gray-400 w-full h-4 rounded dark:bg-gray-700"></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};
