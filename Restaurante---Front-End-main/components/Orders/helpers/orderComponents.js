const OrderInfoForm = ({modalInfo}) => {
  return (
    <ul className="infoOrderForm">
      <li>{`ID pedido: ${modalInfo.id}`}</li>
      <li>{`Fecha de creación: ${modalInfo.title}`}</li>
      <li>{`Total de pedido: ${modalInfo.price}`}</li>
      <li>{`Productos pedidos: ${modalInfo.product_id}`}</li>
      <li>{`Estado de Producto: ${modalInfo.active ? 'Activo' : 'Inactivo'}`}</li>
      <li>{`Mesa: ${modalInfo.number}`}</li>
      <li>{`Tipo de pago: ${modalInfo.payment_id}`}</li>
    </ul>
  )
}

const DeleteOrderInfo = ({title, id}) => {
  return <h1>{`¿Estás seguro que quieres borrar la Orden ${title} con ID ${id}?`}</h1>
}

export {OrderInfoForm, DeleteOrderInfo}
