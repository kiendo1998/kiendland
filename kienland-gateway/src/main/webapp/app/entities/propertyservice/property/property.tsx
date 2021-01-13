import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './property.reducer';
import { IProperty } from 'app/shared/model/propertyservice/property.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { MDBInput, MDBCol } from "mdbreact";
export interface IPropertyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Property = (props: IPropertyProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const { propertyList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="property-heading">
        Properties
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Property
        </Link>
      </h2>
      <MDBCol md="6">
        <MDBInput hint="Tìm kiếm" type="text" containerClass="mt-0" />
      </MDBCol>
      <div className="table-responsive">
        {propertyList && propertyList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('title')}>
                  Title <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('price')}>
                  Price <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('featured')}>
                  Featured <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('purpose')}>
                  Purpose <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('type')}>
                  Type <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('project')}>
                  Project <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('address')}>
                  Address <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('area')}>
                  Area <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('description')}>
                  Description <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('latitude')}>
                  Latitude <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('longitude')}>
                  Longitude <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('images')}>
                  Images <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('createBy')}>
                  Create By <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('titleImage')}>
                  Title Image <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('bedRoom')}>
                  Bed Room <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('bathRoom')}>
                  Bath Room <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {propertyList.map((property, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${property.id}`} color="link" size="sm">
                      {property.id}
                    </Button>
                  </td>
                  <td>{property.title}</td>
                  <td>{property.price}</td>
                  <td>{property.featured ? 'true' : 'false'}</td>
                  <td>{property.purpose}</td>
                  <td>{property.type}</td>
                  <td>{property.project}</td>
                  <td>{property.address}</td>
                  <td>{property.area}</td>
                  <td>{property.description}</td>
                  <td>{property.latitude}</td>
                  <td>{property.longitude}</td>
                  <td>{property.images}</td>
                  <td>{property.createBy}</td>
                  <td>{property.titleImage}</td>
                  <td>{property.bedRoom}</td>
                  <td>{property.bathRoom}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${property.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${property.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${property.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Properties found</div>
        )}
      </div>
      {props.totalItems ? (
        <div className={propertyList && propertyList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = ({ property }: IRootState) => ({
  propertyList: property.entities,
  loading: property.loading,
  totalItems: property.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Property);
