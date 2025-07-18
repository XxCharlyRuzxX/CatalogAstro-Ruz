import type { Product, ProductDTO } from "@/lib/interfaces";
import { productService } from "@/lib/service/productService";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { esES } from "@mui/x-data-grid/locales";
import { toast } from "react-toastify";
import ConfirmationModal from "../../react-components/ConfirmationModal";
import { ActionsCell } from "../ActionsCell";
import AddProductsButton from "../products/AddProductsButton";
import EditProductsModal from "../products/EditProductsModal";

export default function ProductsAdminTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);


  const fetchAllProducts = async () => {
    const products = await productService.getAll();
    setProducts(products);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const onClickDeleteIcon = (productId: string) => {
    setSelectedProductId(productId);
    setIsOpenModalDelete(true);
  };

  const onClickEditIcon = (productId: string) => {
    setSelectedProductId(productId);
    setIsOpenModalEdit(true);
  };

  const onDeleteProduct = async (productId: string | null) => {
    if (!productId) {
      toast.error("ID de producto no válido");
      return;
    }
    try {
      await productService.deleteProduct(productId);
      await fetchAllProducts();
      toast.success("Producto eliminado correctamente");
    } catch (error) {
      toast.error("Error al eliminar el producto: " + (error as Error).message);
    }
  };

  const onSubmitEditProduct = async (product: ProductDTO) => {
    if (!selectedProductId) {
      toast.error("ID de producto no válido");
      return;
    }
    try {
      await productService.putProduct(product, selectedProductId);
      await fetchAllProducts();
      toast.success("Producto actualizado correctamente");
      setIsOpenModalEdit(false);
    } catch (error) {
      toast.error("Error al actualizar el producto: " + (error as Error).message);
    }
  };

  const onSubmitAddProducts = async (product: ProductDTO) => {
    try {
      await productService.postProducts([product]);
      await fetchAllProducts();
      toast.success("Producto añadido correctamente");
    } catch (error) {
      toast.error("Error al añadir el producto: " + (error as Error).message);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "nameProduct",
      headerClassName: "super-app-theme--header",
      headerName: "Nombre del Producto",
      flex: 2,
    },
    {
      field: "brand",
      headerClassName: "super-app-theme--header",
      headerName: "Marca",
      flex: 1,
    },
    {
      field: "priceProduct",
      headerName: "Precio",
      headerClassName: "super-app-theme--header",
      flex: 1,
      valueFormatter: (value?: number) => {
        if (value == null) return "$0.00";
        return `$${value.toFixed(2)}`;
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      headerClassName: "super-app-theme--header",
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => (
        <ActionsCell
          objectId={row.idProduct}
          onDelete={onClickDeleteIcon}
          onEdit={onClickEditIcon}
        />
      ),
    },
  ];

  return (
    <div >
      <AddProductsButton onSubmit={onSubmitAddProducts} />
      <div style={{ height: 650, width: "100%" }} className="md:p-[2rem]">
        <DataGrid
          sx={{
            "& .super-app-theme--header": {
              backgroundColor: "#333333",
              color: "#ffffff",
              "& .MuiDataGrid-sortIcon, & .MuiDataGrid-iconSeparator, & .MuiSvgIcon-root": {
                color: "#ffffff",
              },
            },
            "& .MuiDataGrid-row": {
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            },
            fontSize: {
              xs: "0.75rem",
              sm: "0.875rem",
            },
          }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rows={products}
          columns={columns}
          getRowId={(row) => row.idProduct}
          pageSizeOptions={[10, 20, 50]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          disableRowSelectionOnClick
        />
      </div>

      {isOpenModalDelete && (
        <ConfirmationModal
          textButtonConfirm="Eliminar"
          onConfirm={() => {
            onDeleteProduct(selectedProductId);
            setIsOpenModalDelete(false);
          }}
          onCancel={() => setIsOpenModalDelete(false)}
        >
          <div className="flex flex-col items-center justify-center px-6 py-2">
            <h3 className="font-semibold mb-4 ">
              ¿Estás seguro de eliminar este producto?
            </h3>
            <p className="text-gray-600 mb-4 p-base">
              Esta acción no se puede deshacer.
            </p>
          </div>
        </ConfirmationModal>
      )}

      {isOpenModalEdit && selectedProductId && (
        <EditProductsModal
          productId={selectedProductId}
          isOpen={isOpenModalEdit}
          onSubmit={onSubmitEditProduct}
          CloseModal={() => setIsOpenModalEdit(false)}
        />
      )}
    </div>
  );
}
