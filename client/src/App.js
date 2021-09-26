import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "antd";

import "./App.css";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import { paginate } from "./utilities/paginate";
import logo from "./images/logo.png";

import { Input } from "antd";
import { Table } from "antd";


function App() {
  // this is if I want to get data directly from the frontend without the server
  // const api_url = "https://api.github.com/users/mosh-hamedani/followers";
  const serverApi = 'http://localhost:3101/';
  const pageSize = 6;
  const { Header, Content } = Layout;
  const { Search } = Input;
  const [followers, setFollowers] = useState([]);
  const [filterFollowers, setFilterFollowers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // const users = paginate(followers, currentPage, pageSize);

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar_url",
      key: "avatar_url",
      render: (dataIndex) => <img src={dataIndex} alt="s" />,
    },
    {
      title: "Username",
      dataIndex: "login",
      key: "login",
    },
    {
      title: "Repository",
      dataIndex: "html_url",
      key: "html_url",
      render: (dataIndex) => <a href={dataIndex}>Visit</a>,
    },
  ];

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  useEffect(() => {
    axios
      .get(serverApi)
      .then((res) => {
        console.log("sorted", res.data);
        setFollowers(
          res.data.sort((a, b) =>
            a.login.toUpperCase() > b.login.toUpperCase() ? 1 : -1
          )
        );
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setFilterFollowers(
      followers.filter((follower) => {
        return follower.login.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, followers]);

  return (
    <>
      <Layout>
        <Header>
          <div id="header-wrapper">
            <div id="logo">
              <img src={logo} alt="" />
            </div>
            <Search
              placeholder="search"
              allowClear
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              style={{ width: 441}}
            />
          </div>
        </Header>
        <div className="main-wrapper">
          <Content>
            <Table
              dataSource={filterFollowers}
              pagination={{ pageSize }}
              columns={columns}
            />

            {/* <Pagination
            itemsCount={followers.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          /> */}
          </Content>
          <Footer />
        </div>
      </Layout>
    </>
  );
}

export default App;
