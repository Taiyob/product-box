import {
  Table,
  Button,
  Pagination,
  Layout,
  Typography,
  Flex,
  Spin,
  Result,
  Card,
} from "antd";
import { useGetAllProductsQuery } from "../redux/api/product/productApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import { Product } from "../types/product";
import { motion, AnimatePresence } from "framer-motion";
import { PiShoppingBagFill } from "react-icons/pi";

const { Content } = Layout;
const { Title } = Typography;

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardHover = {
  hover: {
    y: -5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const ProductPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  const { data, isLoading, isError } = useGetAllProductsQuery({
    limit: pageSize,
    skip: (page - 1) * pageSize,
  });

  const handleChangePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail: string) => (
        <img
          src={thumbnail}
          alt="Thumbnail"
          style={{
            width: 60,
            height: 60,
            objectFit: "cover",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a: Product, b: Product) => a.title.localeCompare(b.title),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Product) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => navigate(`/products/${record.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: "60vh" }}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Result
        status="error"
        title="Failed to Load Products"
        subTitle="Please try again later or check your connection."
      />
    );
  }

  return (
    <Layout
      style={{
        background: "#f9fafb",
        minHeight: "100vh",
        padding: "32px 16px",
      }}
    >
      <Content style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <motion.div variants={cardHover}>
            <Card
              variant="outlined"
              style={{
                borderRadius: 16,
                padding: 24,
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <Title
                level={2}
                style={{ textAlign: "center", marginBottom: 32 }}
                className="flex justify-center items-center gap-2"
              >
                <PiShoppingBagFill /> Product List
              </Title>

              <AnimatePresence mode="wait">
                <motion.div
                  key={page}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  style={{ minHeight: 400 }}
                >
                  <Table
                    columns={columns}
                    dataSource={data?.products.map((product: Product) => ({
                      ...product,
                      key: product.id,
                    }))}
                    pagination={false}
                    bordered
                    scroll={{ x: "max-content" }}
                    style={{
                      background: "#fff",
                      borderRadius: 12,
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                style={{ marginTop: 24 }}
              >
                <Flex justify="center">
                  <Pagination
                    current={page}
                    pageSize={pageSize}
                    total={data?.total || 0}
                    onChange={handleChangePage}
                    showSizeChanger={false}
                  />
                </Flex>
              </motion.div>
            </Card>
          </motion.div>
        </motion.div>
      </Content>
    </Layout>
  );
};

export default ProductPage;
