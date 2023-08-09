export const Table = ({
  users,
  selectedUsers,
  selectAllUsers,
  selectUser,
}: any) => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={selectedUsers.length === users.length}
              onChange={selectAllUsers}
            />
          </th>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Last Login Time</th>
          <th>Registration Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: any) => (
          <tr key={user.id}>
            <td>
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id as never)}
                onChange={(event) => selectUser(event, user.id)}
              />
            </td>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.last_login_time?.toString()}</td>
            <td>{user.registration_time.toString()}</td>
            <td>{user.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
