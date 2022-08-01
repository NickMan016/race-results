import './TableLoading.css';

interface PropsTableLoading {
    image: boolean
    columns: number
}

export const TableLoading = ({ image, columns }: PropsTableLoading) => {
    const filas: number[] = [];
    const columnas: number[] = [];
    for (let index = 0; index < 10; index++) {
        filas.push(index)
    }

    for (let index = 0; index < columns; index++) {
        columnas.push(index)
    }

    return (
        <tbody>
            {
                filas.map((value, index) => (
                    <tr key={index} className="skeleton__fila">
                        {
                            image ? (
                                <td className="columna__foto"><div className="skeleton skeleton__foto"></div></td>
                            ) : undefined
                        }
                        {
                            columnas.map((value, index) => (
                                <td key={index}><div className="skeleton skeleton__texto"></div></td>
                            ))
                        }
                    </tr>
                ))
            }
        </tbody>
    )
}