import { Pagination, PaginationResult } from "@/models";
import { productService } from "@/services";
import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Product } from "./Product";
import { Search } from "./Search";

const Products = () => {

  const [pageEvent, setPageEvent] = useState<any>({
    pageNumber: 1,
    pageSize: 10,
  });

  const [products, setProducts] = useState<PaginationResult<any> | null>(null);

  useEffect(() => {
    loadProduct(pageEvent);
  }, [pageEvent]);

  function loadProduct(params) {
    productService.filterProducts(params).then((x) => setProducts(x));
  }

  const onSearch = (dataValue) => {
    setPageEvent({ ...pageEvent, ...dataValue });
  };

  return (
    <>
      <Row gutter={10}>
        <Col span={4}>
          <div className="site-layout-content">
            <Search onSearch={onSearch}></Search>
          </div>
        </Col>
        <Col span={20}>
          <div className="site-layout-content">
            <Row gutter={10}>
              {products &&
                products.items.map((item) => (
                  <Col key={item.id} span={6}>
                    <Product item={item} />
                  </Col>
                ))}
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export { Products };
