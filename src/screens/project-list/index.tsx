import { useState, useEffect } from 'react';
import qs from 'qs';
import { cleanObject, useDebounce } from '../../utils';
import SearchPanel from './search-panel';
import List from './list';

const ProjectListScreen = () => {
  // api 地址
  const apiUrl = process.env.REACT_APP_API_URL;

  const [list, setList] = useState([]); // 列表
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const debouncesParam = useDebounce(param, 200);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncesParam))}`,
    ).then(async res => {
      if (res.ok) {
        setList(await res.json());
      }
    });
  }, [apiUrl, debouncesParam]);

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async res => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  }, [apiUrl, debouncesParam]);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};

export default ProjectListScreen;
