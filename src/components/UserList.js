import React, { useState, useEffect } from "react";
import { Card, Col, Container, Pagination, Row } from "react-bootstrap";
import UserCards from "@/components/UserCards";
import { parseLinkHeader, requestGithubAPI } from "@/utils/request";

const ITEMS_PER_PAGE = 4;

function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextUserId, setNextUserId] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getUsers(currentPage)
  }, []);

  const getUsers = async (since) => {
    const response = await requestGithubAPI({
      method: 'GET',
      url: '/users',
      per_page: ITEMS_PER_PAGE,
      // Workaround while problem with link header is not solved
      since: (since - 1) * ITEMS_PER_PAGE,
    })
    const linkHeader = response.headers.link;
    console.log('linkHeader', linkHeader);
    const links = parseLinkHeader(linkHeader);

    console.log('links', links);

    // setNextUserId(links.next.page)
    setUsers(response.data);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getUsers(page);
  }

  return (
    <>
      <Row className="mb-4">
        <Col>
          <Pagination>
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </Pagination>
        </Col>
      </Row>
      <Row className="row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        <UserCards users={users} />
      </Row>
    </>);
}

export default UserList;