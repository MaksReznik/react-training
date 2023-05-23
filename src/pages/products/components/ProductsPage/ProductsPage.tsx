import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import AddProductModal from '../AddProductModal/AddProductModal';
import ProductsView from '../ProductsView/ProductsView';
import css from './ProductsPage.module.css';
import { changeModalState } from '../../../../state/slices/Products.slice';
import { useAuth } from '../../../authentification/components/AuthentificationContext/AuthentificationContext';
import { Roles } from '../../../authentification/enums/Roles.enum';
import { Button, Switch } from 'antd';
import TableProductsView from '../TableProductsView/TableProductsView';
import Search from 'antd/es/input/Search';
import { debounce } from 'lodash';
import { useLocation } from 'react-router';
import { useSearchParams } from 'react-router-dom';

const ProductsPage = () => {
  const [isTableViewSelected, setIsTableViewSelected] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();
  const { t } = useTranslation();
  const { userStatus } = useAuth();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getValues, register, onChange } = useForm<LoginForm>({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  useEffect(() => {
    setSearchValue(searchParams.get('search') ?? '');
  }, []);

  const changeViewHandler = (checked: boolean) => {
    setIsTableViewSelected(checked);
  };
  const onSearchChange = (value: string) => {
    console.log(value);
    setSearchParams({ search: value });
  };
  const debouncedOnChange = useMemo(() => debounce(onChange, 300), []);

  return (
    <div className={css.products}>
      <AddProductModal></AddProductModal>
      <div className={css.products__header}>
        <h3>
          {t('products.productTitle')}
          <Switch
            defaultChecked={false}
            onChange={changeViewHandler}
            checkedChildren="Table"
            unCheckedChildren="Card"
          ></Switch>
        </h3>
        {userStatus.role === Roles.manager && (
          <button
            onClick={() => dispatch(changeModalState(true))}
            className={css.products__header__button}
          >
            {t('products.newButton')}
          </button>
        )}
      </div>
      <div className={css.products__search}>
        <Search
          {...register('search')}
          className={css.products__search__input}
          onSearch={onChange}
          value={searchValue}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            const { value } = e.currentTarget;
            if (value.length >= 3 || value.length === 0)
              debouncedOnChange(e.currentTarget.value);
          }}
        />
        <Button
          className={css.products__search__button}
          onClick={() => {
            navigator.clipboard.writeText(location.pathname);
          }}
          type="primary"
        >
          Copy filter
        </Button>
      </div>

      <div className={css.products__view}>
        {isTableViewSelected ? (
          <TableProductsView></TableProductsView>
        ) : (
          <ProductsView></ProductsView>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
