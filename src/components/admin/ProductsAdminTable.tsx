import type { Product, ProductDTO } from "@/lib/interfaces";
import { productService } from "@/lib/service/productService";
import { IconButton } from "@mui/material";
import { DataGrid, type GridColDef} from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { esES } from "@mui/x-data-grid/locales";
import AddProductsButton from "./AddProductsButton";
import { toast } from "react-toastify";



export default function ProductsAdminTable() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchAllProducts = async () => {
    const products = await productService.getAll();
    setProducts(products);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const onSubmitAddProducts = async (product: ProductDTO) => {
    try {
      await productService.postProducts([product]);
      await fetchAllProducts();
    } catch (error) {
      toast.error("Error al añadir el producto: " + (error as Error).message);
    }
    toast.success("Producto añadido correctamente");
  };


  const renderActionsCell = useCallback(() => (
    <div className="flex items-center justify-center w-full h-full gap-2">
      <IconButton aria-label="editar" size="small">
        <img
          src="/icons/edit.svg"
          alt="Editar"
          className="w-4 h-4 sm:w-5 sm:h-5"
        />
      </IconButton>
      <IconButton aria-label="eliminar" size="small">
        <img
          src="/icons/delete.svg"
          alt="Eliminar"
          className="w-4 h-4 sm:w-5 sm:h-5"
        />
      </IconButton>
    </div>
  ), []);

  const columns: GridColDef[] = [
    {
      field: "nameProduct",
      headerClassName: 'super-app-theme--header',
      headerName: "Nombre del Producto",
      flex: 2,
    },
    {
      field: "brand",
      headerClassName: 'super-app-theme--header',
      headerName: "Marca",
      flex: 1,
    },
    {
      field: "priceProduct",
      headerName: "Precio",
      headerClassName: 'super-app-theme--header',
      flex: 1,
      valueFormatter: (value?: number) => {
        if (value == null) {
          return '$0.00';
        }
        return `$${value.toFixed(2)}`;
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      headerClassName: 'super-app-theme--header',
      flex: 1,
      sortable: false,
      renderCell: renderActionsCell,
    },
  ];

  return (
    <>
    <AddProductsButton onSubmit={onSubmitAddProducts}/>
    <div style={{ height: 650, width: "100%" }} className="md:p-[2rem]">
      <DataGrid
      sx={{
        '& .super-app-theme--header': {
          backgroundColor: "#333333",
          color: "#ffffff",
          '& .MuiDataGrid-sortIcon, & .MuiDataGrid-iconSeparator, & .MuiSvgIcon-root': {
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
      </>
  );
}
