import './property.scss';

import React, {useEffect, useState} from 'react';
import {getSortState, Translate} from 'react-jhipster';
import {connect} from 'react-redux';
import {Row, Col} from 'reactstrap';
import {RouteComponentProps} from "react-router";
import {overridePaginationStateWithQueryParams} from "app/shared/util/entity-utils";
import {ITEMS_PER_PAGE} from "app/shared/util/pagination.constants";
import {IRootState} from "app/shared/reducers";
import {getEntities} from "app/entities/propertyservice/property/property.reducer";
import StarRatings from 'react-star-ratings';
export interface IPropertyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

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

  const {propertyList, match, loading, totalItems} = props;

  return (
    <section className="section">
      <div className="container">
        <div className="row">
          <h4 className="section-heading">Tất cả bất động sản</h4>
        </div>

        <div className="row">
          <div className="city-categories">
            <div className="col s12 m3">
              <a href="linktoproject">
                <div className="city-category">
                  <span>Vinhome</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        {propertyList && propertyList.length > 0 ? (
        <div className="row">
          {propertyList.map((property, i) => (
          <div key={`entity-${i}`} className="col-sm-4">
            <div className="card">
              <div className="card-image">

                <span className="card-image-bg" style={{'backgroundImage': `url(${"../../../content/images/"+property.titleImage})`}}></span>
                <a className="btn-floating halfway-fab waves-effect waves-light indigo"><i
                  className="small material-icons">star</i></a>
              </div>
              <div className="card-content property-content">
                <a href={`${match.url}/../../property/${property.id}`}>
                  <span className="card-title tooltipped" data-position="bottom"
                  >{property.title}</span>
                </a>

                <div className="address">
                  <i className="small material-icons left">place</i>
                  <span>{property.project}</span>
                </div>
                <div className="address">
                  <i className="small material-icons left">language</i>
                  <span>{property.address}</span>
                </div>

                <div className="address">
                  <i className="small material-icons left">check_box</i>
                  <span>{property.type}</span>
                </div>
                <div className="address">
                  <i className="small material-icons left">check_box</i>
                  <span>Đang {property.purpose}</span>
                </div>

                <h5>
                  {property.price}đ
                  <div className="right">
                    <div className="right">
                      <StarRatings
                        rating={2.403}
                        starDimension="20px"
                        starSpacing="3px"
                        starRatedColor='yellow'
                        starHoverColor='yellow'
                      />
                    </div>
                  </div>
                </h5>
              </div>
              <div className="card-action property-action">
                                <span className="btn-flat">
                                    <i className="material-icons">check_box</i>
                                    Phòng ngủ: <strong>{property.bedRoom}</strong>
                                </span>
                <span className="btn-flat">
                                    <i className="material-icons">check_box</i>
                                    Phòng tắm: <strong>{property.bathRoom}</strong>
                                </span>
                <span className="btn-flat">
                                    <i className="material-icons">check_box</i>
                                    Diện tích: <strong>{property.area}</strong> Mét vuông
                                </span>
              </div>
            </div>
          </div>
          ))}
        </div>
        ) : (
          !loading && <div className="alert alert-warning">không có bất động sản nào</div>
        )}

      </div>
    </section>
  )
}

const mapStateToProps = ({property}: IRootState) => ({
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
