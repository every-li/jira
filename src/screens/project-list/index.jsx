import { useState, useEffect } from 'react';
import qs from 'qs';
import { cleanObject, useDebounce } from '../../utils';
import SearchPanel from './search-panel';
import List from './list';

const ProjectListScreen = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [list, setList] = useState([]);
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const debouncesParam = useDebounce(param, 1000);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(
      async res => {
        if (res.ok) {
          setList(await res.json());
        }
      },
    );
  }, [debouncesParam]);

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async res => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  }, [debouncesParam]);

  return (
    <div>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
        setUsers={setUsers}
      />
      <List list={list} users={users} />
    </div>
  );
};

export default ProjectListScreen;
