/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (properties, objects) => {
  return objects.map(obj => {
    return Object.keys(obj).reduce((result, key) => {
      return (properties.indexOf(key) === -1) ? {
        ...result,
        [key]: obj[key],
      } : result;
    }, {});
  });
};
exports.excludeByProperty = (property, objects) => {
  return objects.filter(obj => obj[property] === undefined);
};
exports.sumDeep = (inputs) => {
  return inputs.map(input => {
    return {objects: input.objects.reduce((result, obj) => result + obj.val, 0)}
  });
};
exports.applyStatusColor = (colorSettings, statusInputs) => {
  const colorMap = Object.keys(colorSettings).reduce((result, colorKey) => {
    colorSettings[colorKey].forEach(statusCode => result[statusCode] = colorKey);
    return result;
  }, {});
  return statusInputs.filter(statusInput => colorMap[statusInput.status] !== undefined).map(statusInput => {
    return {
      ...statusInput,
      color: colorMap[statusInput.status],
    };
  })
};
exports.createGreeting = (func, greeting) => {
  return (name) => func(greeting, name);
};
exports.setDefaults = (defaultProps) => {
  return (obj) => {
    Object.keys(defaultProps).forEach(key => {
      if (obj[key] === undefined) {
        obj[key] = defaultProps[key];
      }
    })
    return obj;
  }
};
exports.fetchUserByNameAndUsersCompany = async (name, services) => {
  try {
    const users = await services.fetchUsers();
    const user = users.find(item => item.name === name);
    const company = await services.fetchCompanyById(user.companyId);
    const status = await services.fetchStatus();
    return {company, user, status};
  } catch(e) {
    return {};
  }
};
