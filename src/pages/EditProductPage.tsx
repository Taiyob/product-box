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
import { CategoryList, Product } from "../types/product";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { motion } from "framer-motion";

const { Title } = Typography;
const { TextArea } = Input;

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data: product, isLoading } = useGetProductByIdQuery(Number(id));
  const { data: categories } = useGetProductCategoriesQuery() as {
    data: CategoryList[];
  };
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
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      style={{ margin: 24 }}
    >
      <Card
        title={
          <motion.div variants={fadeIn}>
            <Title level={3}>Edit Product: {product.title}</Title>
          </motion.div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={product}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <Row gutter={16}>
              <Col span={12}>
                <motion.div variants={fadeIn}>
                  <Form.Item
                    name="title"
                    label="Product Title"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <Form.Item
                    name="brand"
                    label="Brand"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <Form.Item
                    name="category"
                    label="Category"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select Category">
                      {categories?.map((cat) => (
                        <Select.Option key={cat.slug} value={cat.slug}>
                          {cat.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <Form.Item
                    name="price"
                    label="Price"
                    rules={[{ required: true }]}
                  >
                    <InputNumber min={0} style={{ width: "100%" }} />
                  </Form.Item>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <Form.Item name="stock" label="Stock">
                    <InputNumber min={0} style={{ width: "100%" }} />
                  </Form.Item>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <Form.Item name="discountPercentage" label="Discount (%)">
                    <InputNumber min={0} max={100} style={{ width: "100%" }} />
                  </Form.Item>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <Form.Item name="availabilityStatus" label="Availability">
                    <Input />
                  </Form.Item>
                </motion.div>
              </Col>

              <Col span={12}>
                <motion.div variants={fadeIn}>
                  <Form.Item name="sku" label="SKU">
                    <Input />
                  </Form.Item>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <Form.Item
                    name="minimumOrderQuantity"
                    label="Minimum Order Qty"
                  >
                    <InputNumber min={1} style={{ width: "100%" }} />
                  </Form.Item>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <Form.Item name="shippingInformation" label="Shipping Info">
                    <Input />
                  </Form.Item>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <Form.Item name="returnPolicy" label="Return Policy">
                    <Input />
                  </Form.Item>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <Form.Item name="description" label="Description">
                    <TextArea rows={4} />
                  </Form.Item>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <Form.Item name="tags" label="Tags">
                    <Select mode="tags" placeholder="Add tags" />
                  </Form.Item>
                </motion.div>
              </Col>
            </Row>
          </motion.div>

          <Form.List name="reviews">
            {(fields, { add, remove }) => (
              <motion.div variants={fadeIn}>
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
              </motion.div>
            )}
          </Form.List>

          <Form.Item style={{ marginTop: 24 }}>
            <Space>
              <motion.div variants={fadeIn}>
                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                  Submit
                </Button>
              </motion.div>
              <motion.div variants={fadeIn}>
                <Button onClick={() => navigate(`/products/${id}`)}>
                  Cancel
                </Button>
              </motion.div>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </motion.div>
  );
};

export default EditProductPage;
