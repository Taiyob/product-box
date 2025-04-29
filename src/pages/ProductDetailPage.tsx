import {
  Card,
  Descriptions,
  Image,
  Layout,
  Typography,
  Button,
  Space,
  Divider,
  Spin,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductByIdQuery } from "../redux/api/product/productApi";

const { Content } = Layout;
const { Title } = Typography;

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(Number(id));

  if (isLoading) {
    return (
      <Layout
        style={{ padding: "20px", background: "#f0f2f5", minHeight: "100vh" }}
      >
        <Content
          style={{
            background: "#fff",
            padding: "24px",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <Spin size="large" />
        </Content>
      </Layout>
    );
  }

  if (isError || !product) return <div>Something went wrong!</div>;

  return (
    <Layout
      style={{ padding: "20px", background: "#f0f2f5", minHeight: "100vh" }}
    >
      <Content
        style={{ background: "#fff", padding: "24px", borderRadius: "8px" }}
      >
        <Space style={{ marginBottom: "20px" }}>
          <Button onClick={() => navigate("/products")}>
            Back to Products
          </Button>
        </Space>

        <Title level={2} style={{ textAlign: "center" }}>
          {product.title}
        </Title>

        <Card
          cover={
            <Image
              src={product.images[0]}
              alt={product.title}
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          }
          variant="outlined"
          style={{ width: "100%", marginBottom: "20px" }}
        >
          <Descriptions
            title="Product Info"
            bordered
            column={{
              xxl: 3,
              xl: 3,
              lg: 2,
              md: 2,
              sm: 1,
              xs: 1,
            }}
            size="middle"
          >
            <Descriptions.Item label="Brand">{product.brand}</Descriptions.Item>
            <Descriptions.Item label="Category">
              {product.category}
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              ${product.price}
            </Descriptions.Item>
            <Descriptions.Item label="Stock">{product.stock}</Descriptions.Item>
            <Descriptions.Item label="Discount">
              {product.discountPercentage}%
            </Descriptions.Item>
            <Descriptions.Item label="Availability">
              {product.availabilityStatus}
            </Descriptions.Item>
            <Descriptions.Item label="Shipping Info">
              {product.shippingInformation}
            </Descriptions.Item>
            <Descriptions.Item label="SKU">{product.sku}</Descriptions.Item>
            <Descriptions.Item label="Minimum Order Quantity">
              {product.minimumOrderQuantity}
            </Descriptions.Item>
            <Descriptions.Item label="Return Policy">
              {product.returnPolicy}
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          <Descriptions
            title="Meta Information"
            bordered
            column={{
              xxl: 3,
              xl: 3,
              lg: 2,
              md: 2,
              sm: 1,
              xs: 1,
            }}
            size="small"
          >
            <Descriptions.Item label="Barcode">
              {product.meta.barcode}
            </Descriptions.Item>
            <Descriptions.Item label="QR Code">
              <Image src={product.meta.qrCode} width={100} />
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {new Date(product.meta.createdAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Updated At">
              {new Date(product.meta.updatedAt).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          <Descriptions
            title="Dimensions (cm)"
            bordered
            column={{
              xxl: 3,
              xl: 3,
              lg: 2,
              md: 2,
              sm: 1,
              xs: 1,
            }}
            size="small"
          >
            <Descriptions.Item label="Width">
              {product.dimensions.width}
            </Descriptions.Item>
            <Descriptions.Item label="Height">
              {product.dimensions.height}
            </Descriptions.Item>
            <Descriptions.Item label="Depth">
              {product.dimensions.depth}
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          <div style={{ marginTop: "20px" }}>
            <Title level={4}>Description:</Title>
            <p>{product.description}</p>
          </div>

          <Divider />

          <div>
            <Title level={4}>Tags:</Title>
            <Space>
              {product.tags.map((tag, index) => (
                <Button key={index} size="small" type="dashed">
                  {tag}
                </Button>
              ))}
            </Space>
          </div>

          <Divider />

          <div>
            <Title level={4}>Reviews:</Title>
            {product.reviews.map((review, index) => (
              <Card
                key={index}
                size="small"
                variant="outlined"
                style={{ marginBottom: "10px" }}
              >
                <p>
                  <strong>Reviewer:</strong> {review.reviewerName} (
                  {review.reviewerEmail})
                </p>
                <p>
                  <strong>Rating:</strong> {review.rating}
                </p>
                <p>
                  <strong>Comment:</strong> {review.comment}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </Card>
            ))}
          </div>

          <Divider />

          <div style={{ textAlign: "center" }}>
            <Button
              type="primary"
              onClick={() => navigate(`/products/${product.id}/edit`)}
            >
              Edit Product
            </Button>
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default ProductDetailPage;
