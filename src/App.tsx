import { Layout, Button, Typography, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./App.css";
import { BsCart4 } from "react-icons/bs";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function App() {
  const navigate = useNavigate();

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #f0f2f5, #e6f7ff)",
      }}
    >
      <Header
        style={{
          background: "#001529",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: 600,
        }}
      >
        <div className="flex justify-center items-center gap-2">
          {" "}
          <BsCart4 /> My E-Commerce Store
        </div>
      </Header>

      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 20px",
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          style={{ width: "100%", maxWidth: 700 }}
        >
          <Card
            style={{
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Title level={2} style={{ textAlign: "center", marginBottom: 16 }}>
              Welcome to My Product Store
            </Title>
            <Paragraph style={{ fontSize: "16px", textAlign: "center" }}>
              Discover high-quality products across all categories. Enjoy fast
              delivery, great discounts, and exclusive deals crafted just for
              you!
            </Paragraph>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="primary"
                  size="large"
                  style={{ marginTop: 20 }}
                  onClick={() => navigate("/products")}
                >
                  View Products
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </Content>

      <Footer style={{ textAlign: "center", background: "#f0f2f5" }}>
        © {new Date().getFullYear()} My E-Commerce Store. Built with and Ant
        Design.
      </Footer>
    </Layout>
  );
}

export default App;
