import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Card, Container, Row, Col, Image, Badge, Pagination } from 'react-bootstrap';
import { requestGithubAPI } from '@/utils/request';
import Link from 'next/link';

const ITEMS_PER_PAGE = 4;

function RepoCard(props) {
    const { repo } = props;

    return (
        <Card style={{ width: '250px', height: '220px' }} className="overflow-hidden">
            <Card.Body>
                <Card.Title>
                    <a href={repo.html_url} style={{ 'text-decoration': 'none' }}>
                        {repo.name}
                    </a>
                </Card.Title>
                <Card.Subtitle>
                    <Badge bg="danger">{repo.language}</Badge>
                    {repo.license && <Badge bg="primary">{repo.license?.name}</Badge>}
                </Card.Subtitle>
                <Card.Text>{repo.description && repo.description.substring(0, 50) + '...'}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">
                    Updated at {new Date(repo.updated_at).toLocaleString()}
                </small>
            </Card.Footer>
        </Card>
    );
}

function RepoCardList(props) {
    const router = useRouter();
    let [repos, setRepos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (router.isReady) {
            getRepos(currentPage);
        }
    }, [router.isReady]);

    const getRepos = async (page) => {
        const response = await requestGithubAPI({
            method: 'GET',
            url: '/users/{username}/repos',
            username: router.query.username,
            per_page: ITEMS_PER_PAGE,
            page,
        })
            .then(response => setRepos(response.data))
            .catch(error => console.log(error));
        // const linkHeader = response.headers.link;
        // console.log('linkHeader', linkHeader);
        // const links = parseLinkHeader(linkHeader);

        // console.log('links', links);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        getRepos(page);
    }

    return (
        <>
            <Row>
                <h1>
                    <Link href={{
                        pathname: '/users/[username]/details',
                        query: { username: repos[0]?.owner.login },
                    }} className="text-decoration-none">{repos[0]?.owner.login}
                    </Link>
                </h1>
                {/* TODO: Get Last Page from link header or number of repos  */}
                <Pagination>
                    <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1} />
                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
                </Pagination>
            </Row>
            <Row xs={1} md={2} lg={4} className="g-4">
                {repos.map((repo) => (
                    <Col md={3} key={repo.id}>
                        <RepoCard repo={repo} />
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default RepoCardList;