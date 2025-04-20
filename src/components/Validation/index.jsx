import PropTypes from 'prop-types';
import { Validation } from './styles';

export function Validacao({ children, ...props }) {
  return <Validation {...props}>{children}</Validation>;
}

Validacao.propTypes = {
  children: PropTypes.string.isRequired,
};
