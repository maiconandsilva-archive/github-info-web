import React from "react";
import Link from 'next/link'
import { Card, Col, Badge } from "react-bootstrap";

const UserCards = ({ users }) => {
    return (
        <>
          {users.map((user) => (
            <Col key={user.id} md={3} className="mb-4">
              <Link href={{
                pathname: '/users/[username]/details',
                query: { username: user.login },
              }} className="text-decoration-none">
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src={user.avatar_url} />
                  <Card.Body>
                    <Card.Title><Badge bg="info">{user.id}</Badge> {user.login}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </>
    );
};


export default UserCards;