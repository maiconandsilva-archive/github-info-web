import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Card, Container, Row, Col, Image, Badge } from 'react-bootstrap';
import { requestGithubAPI } from '@/utils/request';
import Link from 'next/link';

const ProfilePage = () => {
  const router = useRouter();
  let [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (router.isReady) {
      requestGithubAPI({
        method: 'GET',
        url: '/users/{username}/details',
        username: router.query.username,
      })
        .then(response => {
          setUser(response.data)
          const linkHeader = response.headers.get("Link");
          const links = parseLinkHeader(linkHeader);
          setTotalPages(links.last.page);
        })
        .catch(error => console.log(error));
    }
  }, [router.isReady]);

  return (
    <Container>
      <Row>
        <Col>
          <Card className="shadow p-3 mb-5 bg-white rounded">
            <Card.Body>
              <Row>
                <Col>
                  <Image src={user.avatar_url} roundedCircle className="mb-5" style={{ 'height': '250px' }} />
                </Col>
                <Col>
                  <Card.Text>Email: {user.email || 'N/A'}</Card.Text>
                  <Card.Text>Location: {user.location || 'N/A'}</Card.Text>
                  <Card.Text>Company: {user.company || 'N/A'}</Card.Text>
                  <Card.Text>Blog: {user.blog || 'N/A'}</Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    <Link href={{
                      pathname: '/users/[username]/repos',
                      query: { username: user.login },
                    }} className="text-decoration-none">
                      <Badge bg="success">{user.public_repos}</Badge> Public Repositories
                    </Link>
                  </Card.Text>
                  <Card.Text><Badge bg="success">{user.public_gists}</Badge> Public Gists</Card.Text>
                  <Card.Text><Badge bg="success">{user.followers}</Badge> Followers</Card.Text>
                  <Card.Text><Badge bg="success">{user.following}</Badge> Following</Card.Text>
                </Col>
              </Row>
              <hr />
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>{user.bio}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated {new Date(user.updated_at).toLocaleDateString()}</small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;