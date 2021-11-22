import React, { createElement } from 'react';
import PropTypes from 'prop-types';

const stringifyJSON = (data) => {
  if (data === undefined) return undefined;
  else if (data === null) return 'null';
  else if (data.constructor.name === 'String') {
    return '"' + data.replace(/"/g, '\\"') + '"';
  } else if (data.constructor.name === 'Number') return String(data);
  else if (data.constructor.name === 'Boolean') return data ? 'true' : 'false';
  else if (data.constructor.name === 'Function') {
    const name = data.name ? data.name : 'handler';
    return `"[Function: ${name}]"`;
  } else if (data.constructor.name === 'Array')
    return (
      '[ ' +
      data
        .reduce((acc, v) => {
          if (v === undefined) return [...acc, 'null'];
          else return [...acc, stringifyJSON(v)];
        }, [])
        .join(', ') +
      ' ]'
    );
  else if (data.constructor.name === 'Object')
    return (
      '{ ' +
      Object.keys(data)
        .reduce((acc, k) => {
          if (data[k] === undefined) return acc;
          else return [...acc, stringifyJSON(k) + ':' + stringifyJSON(data[k])];
        }, [])
        .join(', ') +
      ' }'
    );
  else return '{}';
};

const MockComponent = (inputProps) => {
  const { componentName, props } = inputProps;
  const { children, ...rest } = props;
  let getMappedProps = {};
  Object.keys(rest).map((p) => {
    if (rest[p].constructor.name === 'Function') {
      getMappedProps = { ...getMappedProps, [p]: stringifyJSON(rest[p]) };
    } else if (props[p].constructor.name === 'Object') {
      getMappedProps = { ...getMappedProps, [p]: stringifyJSON(rest[p]) };
    } else if (props[p].constructor.name === 'Array') {
      getMappedProps = { ...getMappedProps, [p]: stringifyJSON(rest[p]) };
    } else {
      getMappedProps = { ...getMappedProps, [p]: rest[p] };
    }
    return getMappedProps;
  });

  const name = `${componentName}-mock-component`;
  return createElement(name, { ...getMappedProps, children });
};

MockComponent.propTypes = {
  componentName: PropTypes.string.isRequired,
  props: PropTypes.object,
};

MockComponent.defaultProps = {
  props: {},
};

export { MockComponent };
