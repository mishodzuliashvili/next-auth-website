"use client";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { useEffect, useState } from "react";
import { Table } from "./Table";
import { CgUnblock } from "react-icons/cg";
import { AiFillDelete } from "react-icons/ai";
import RedButton from "./RedButton";
import { signOut } from "next-auth/react";
function UsersTable({ users: tempUsers }: any) {
  const [users, setUsers] = useState<any>(tempUsers);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const redirectIfBlocked = async () => {
    const res = await fetch("/api/auth/user");
    const { user } = await res.json();
    if (res.ok) {
      if (user.status === "blocked") {
        await signOut();
      } else {
        return {
          isActive: true,
          id: user.id,
        };
      }
    } else {
      setError("Your Status is undefined!");
    }
    return {
      isActive: false,
      id: user.id,
    };
  };

  const selectUser = (event: any, userId: string) => {
    if (event.target.checked) {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, userId]);
    } else {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((id) => id !== userId)
      );
    }
  };

  useEffect(() => {
    redirectIfBlocked().then(() => setLoading(false));
  }, []);

  const selectAllUsers = (event: any) => {
    setSelectedUsers(
      event.target.checked ? users.map((user: any) => user.id) : []
    );
  };
  const deleteSelectedUsers = async () => {
    setLoading(true);
    let user = await redirectIfBlocked();
    if (!user.isActive) return;
    const res = await fetch("/api/users/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ users: selectedUsers }),
    });
    if (res.ok) {
      setUsers((prevUsers: any) =>
        prevUsers.filter((user: any) => !selectedUsers.includes(user.id))
      );
      // if selected users includes the current user, sign out
      if (selectedUsers.includes(user.id)) {
        await signOut();
      } else {
        setSelectedUsers([]);
        setLoading(false);
      }
    } else {
      setError("Error deleting users!");
      setLoading(false);
    }
  };
  const blockSelectedUsers = async () => {
    setLoading(true);
    let user = await redirectIfBlocked();
    if (!user.isActive) return;
    const res = await fetch("/api/users/block", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ users: selectedUsers }),
    });
    if (res.ok) {
      setUsers((prevUsers: any) =>
        prevUsers.map((user: any) => {
          if (selectedUsers.includes(user.id)) {
            return { ...user, status: "blocked" };
          }
          return user;
        })
      );
      // if selected users includes the current user, sign out
      if (selectedUsers.includes(user.id)) {
        await signOut();
      } else {
        setSelectedUsers([]);
        setLoading(false);
      }
    } else {
      setError("Error blocking users!");
      setLoading(false);
    }
  };
  const unblockSelectedUsers = async () => {
    setLoading(true);
    let user = await redirectIfBlocked();
    if (!user.isActive) return;
    const res = await fetch("/api/users/unblock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ users: selectedUsers }),
    });
    if (res.ok) {
      setUsers((prevUsers: any) =>
        prevUsers.map((user: any) => {
          if (selectedUsers.includes(user.id)) {
            return { ...user, status: "active" };
          }
          return user;
        })
      );
      setSelectedUsers([]);
    } else {
      setError("Error unblocking users!");
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <RedButton disabled={loading} onClick={blockSelectedUsers}>
          Block
        </RedButton>
        <Button disabled={loading} onClick={unblockSelectedUsers}>
          <CgUnblock />
        </Button>
        <Button disabled={loading} onClick={deleteSelectedUsers}>
          <AiFillDelete />
        </Button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="overflow-x-auto">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table
            users={users}
            selectUser={selectUser}
            selectedUsers={selectedUsers}
            selectAllUsers={selectAllUsers}
          />
        )}
      </div>
    </div>
  );
}

export default UsersTable;
