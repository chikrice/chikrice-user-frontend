export function getAllItems({ data }) {
  const items = data.flatMap((group) =>
    group.categories.map((category) => ({
      title: category.title,
      coverUrl: category.coverUrl,
      path: category.path,
    }))
  );

  return items;
}

// ----------------------------------------------------------------------

export function applyFilter({ inputData, query }) {
  if (query) {
    inputData = inputData.filter(
      (item) =>
        item?.title?.en.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item?.title?.cn.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item?.title?.ar.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item?.title?.fa.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return inputData;
}

// ----------------------------------------------------------------------

export function groupedData(array) {
  const group = array.reduce((groups, item) => {
    groups[item.group] = groups[item.group] || [];

    groups[item.group].push(item);

    return groups;
  }, {});

  return group;
}
