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
import isEqual from 'lodash/isEqual';

export interface IPropertyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export const Property = (props: IPropertyProps) => {
  //filter
  const [filter, setFilter] = useState('');
  const changeFilter = evt => setFilter(evt.target.value);
  //price filter
  const [priceFilter, setPriceFilter] = useState('');
  const changePriceFilter = evt => setPriceFilter(evt.target.value);
  //bed filter
  const [bedFilter, setBedFilter] = useState('');
  const changeBedFilter = evt => setBedFilter(evt.target.value);
  //type filter
  const [typeFilter, setTypeFilter] = useState('');
  const changeTypeFilter = evt => setTypeFilter(evt.target.value);
  //purpose filter
  const [purposeFilter, setPurposeFilter] = useState('');
  const changePurposeFilter = evt => setPurposeFilter(evt.target.value);

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
    <div>
      <section className="section">
        <div className="container">
          <div className="row">
            <h4 className="section-heading">Tất cả bất động sản</h4>
          </div>
          <div className="row">
            <div className="col s12">
              <form action="{{ route('search')}} " method="GET">
                <div className="searchbar">
                  <div className="input-field col-sm-2 left">
                    <label style={{color:'black'}}>Tìm kiếm bất động sản</label>
                  </div>
                  <div className="input-field col-sm-2 left">
                    <input placeholder="Nhập dự án" type="text" name="project" value={filter} onChange={changeFilter} id="autocomplete-input" className="autocomplete custominputbox"
                           autoComplete="off"/>
                  </div>
                  <div className="input-field col-sm-2 left">
                    <select name="type" className="browser-default" value={typeFilter} onChange={changeTypeFilter}>
                      <option value="" selected>Kiểu Bất Động Sản</option>
                      <option value="Căn hộ">Căn hộ chung cư</option>
                      <option value="Nhà đất">Nhà đất</option>
                      <option value="Đất nền">Đất nền</option>
                    </select>
                  </div>
                  <div className="input-field col-sm-2 left">
                    <select name="purpose" className="browser-default" value={purposeFilter} onChange={changePurposeFilter}>
                      <option value="" selected>Mục đích</option>
                      <option value="Bán">Bán</option>
                      <option value="Cho thuê">Cho thuê</option>
                    </select>
                  </div>
                  <div className="input-field col-sm-2 left">
                    <input placeholder="Số phòng ngủ" value={bedFilter} onChange={changeBedFilter} type="text" name="maxprice" id="maxprice" className="custominputbox"/>
                  </div>
                  <div className="input-field col-sm-2 left">
                    <input placeholder="Giá tối đa" value={priceFilter} onChange={changePriceFilter} type="text" name="maxprice" id="maxprice" className="custominputbox"/>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/*<div className="row">*/}
          {/*  <div className="city-categories">*/}
          {/*    <div className="col s12 m3">*/}
          {/*      <a href="linktoproject">*/}
          {/*        <div className="city-category">*/}
          {/*          <span>Vinhome</span>*/}
          {/*        </div>*/}
          {/*      </a>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {propertyList && propertyList.length > 0 ? (
            <div className="row">
              {propertyList.
              filter(property=>property.project.toLowerCase().includes(`${filter}`.trim().toLowerCase())).
              filter(property=>(property.price<parseFloat(priceFilter)||isNaN(parseFloat(priceFilter)))&&(isEqual(property.bedRoom,parseInt(bedFilter,10))||isNaN(parseInt(bedFilter,10)))).
              filter(property=>property.type.includes(`${typeFilter}`)).
              filter(property=>property.purpose.includes(`${purposeFilter}`)).
              map((property, i) => (
                <div key={`entity-${i}`} className="col-sm-4">
                  <div className="card">
                    <div className="card-image">

                      <span className="card-image-bg"
                            style={{'backgroundImage': `url(${"../../../content/images/" + property.titleImage})`}}></span>
                      {property.featured? <a className="btn-floating halfway-fab waves-effect waves-light indigo"><i
                        className="small material-icons">star</i></a>:''}

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
    </div>

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
