import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useGetProductCategoriesQuery,
  useUpdateProductMutation,
} from "../redux/api/product/productApi";
import { Product } from "../types/product";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const { Title } = Typography;
const { TextArea } = Input;

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data: product, isLoading } = useGetProductByIdQuery(Number(id));
  const { data: categories } = useGetProductCategoriesQuery();
  const [updateProduct, { isLoading: isSubmitting }] =
    useUpdateProductMutation();

  const handleFinish = (values: Partial<Product>) => {
    updateProduct({ id: Number(id), body: values })
      .unwrap()
      .then(() => {
        message.success("Product updated successfully!");
        navigate(`/products/${id}`);
      })
      .catch(() => {
        message.error("Failed to update product.");
      });
  };

  if (isLoading || !product) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
      </div>
    );
  }

  return (
    <Card
      title={<Title level={3}>Edit Product: {product.title}</Title>}
      style={{ margin: 24 }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={product}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="Product Title"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select Category">
                {categories?.map((cat) => (
                  <Select.Option key={cat} value={cat}>
                    {cat}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="stock" label="Stock">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="discountPercentage" label="Discount (%)">
              <InputNumber min={0} max={100} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="availabilityStatus" label="Availability">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="sku" label="SKU">
              <Input />
            </Form.Item>
            <Form.Item name="minimumOrderQuantity" label="Minimum Order Qty">
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="shippingInformation" label="Shipping Info">
              <Input />
            </Form.Item>
            <Form.Item name="returnPolicy" label="Return Policy">
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item name="tags" label="Tags">
              <Select mode="tags" placeholder="Add tags" />
            </Form.Item>
          </Col>
        </Row>

        <Form.List name="reviews">
          {(fields, { add, remove }) => (
            <Card title="Reviews" style={{ marginTop: 20 }}>
              {fields.map(({ key, name, ...restField }) => (
                <Row gutter={12} key={key}>
                  <Col span={5}>
                    <Form.Item
                      {...restField}
                      name={[name, "reviewerName"]}
                      label="Reviewer Name"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item
                      {...restField}
                      name={[name, "reviewerEmail"]}
                      label="Reviewer Email"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, "rating"]}
                      label="Rating"
                    >
                      <InputNumber min={1} max={5} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "comment"]}
                      label="Comment"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col
                    span={2}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Button danger onClick={() => remove(name)}>
                      Remove
                    </Button>
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  + Add Review
                </Button>
              </Form.Item>
            </Card>
          )}
        </Form.List>

        <Form.Item style={{ marginTop: 24 }}>
          <Space>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Submit
            </Button>
            <Button onClick={() => navigate(`/products/${id}`)}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditProductPage;
