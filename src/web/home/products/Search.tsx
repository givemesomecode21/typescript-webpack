import React, { useState, useEffect } from "react";
import { categoryService, brandService } from "@/services";
import { Checkbox, Col, Form, Row } from "antd";

const prices = [
  { id: "1", name: "< 5 mil", max: 5000000, min: 0 },
  { id: "2", name: "From 5 mil to 10 mil", max: 10000000, min: 5000000 },
  { id: "3", name: "From 10 mil to 15 mil", max: 15000000, min: 10000000 },
  { id: "4", name: "From 15 mil to 20 mil", max: 20000000, min: 15000000 },
  { id: "5", name: "From 20 mil to 30 mil", max: 30000000, min: 20000000 },
  { id: "6", name: "From 30 mil to 40 mil", max: 40000000, min: 30000000 },
  { id: "7", name: "> 50 mil", max: null, min: 40000000 },
];

const Search = (props) => {
  const [formValue, setFormValue] = useState({
    categoryIds: [],
    brandIds: [],
    prices: [],
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    categoryService.getAll().then((x) => setCategories(x));
    brandService.getAll().then((x) => setBrands(x));
  }, []);

  const onChange = (name, value, checked) => {
    const newValue = { ...formValue };
    if (name === "prices") {
      newValue[name] = checked
        ? [...newValue[name], value]
        : newValue[name].filter((x) => x.id !== value.id);
    } else {
      newValue[name] = checked
        ? [...newValue[name], value]
        : newValue[name].filter((x) => x !== value);
    }
    setFormValue(newValue);

    props.onSearch(newValue);
  };

  return (
    <>
      <Form>
        <Row>
          <Col lg={24}>
            <b>CATEGORY</b>
          </Col>
          {categories.map((item: any, index) => (
            <Col key={index} lg={12}>
              <div className="mb-5 mt-5">
                <Checkbox
                  onChange={(e) =>
                    onChange("categoryIds", item.id, e.target.checked)
                  }
                >
                  {item.name}
                </Checkbox>
              </div>
            </Col>
          ))}
        </Row>
        <Row className="mt-10">
          <Col lg={24}>
            <b>BRAND</b>
          </Col>
          {brands.map((item: any, index) => (
            <Col key={index} lg={12}>
              <div className="mb-5 mt-5">
                <Checkbox
                  onChange={(e) =>
                    onChange("brandIds", item.id, e.target.checked)
                  }
                >
                  {item.name}
                </Checkbox>
              </div>
            </Col>
          ))}
        </Row>
        <Row className="mt-10">
          <Col lg={24}>
            <b>PRICE</b>
          </Col>
          {prices.map((item, index) => (
            <Col key={index} lg={24}>
              <div className="mb-5 mt-5">
                <Checkbox
                  onChange={(e) => onChange("prices", item, e.target.checked)}
                >
                  {item.name}
                </Checkbox>
              </div>
            </Col>
          ))}
        </Row>
      </Form>
    </>
  );
};

export { Search };
