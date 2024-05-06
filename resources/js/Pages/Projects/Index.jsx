import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";

export default function Index({ auth, projects, queryParams = null }) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Projects
        </h2>
      }
    >
      <Head title="Projects" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              {/* <pre>{JSON.stringify(projects.meta.links, undefined, 2)}</pre> */}
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th className="p-3">No.</th>
                    <th className="p-3">Image</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Created Date</th>
                    <th className="p-3">Due Date</th>
                    <th className="p-3">Created By</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                  <tr className="text-nowrap">
                    <th className="p-3"></th>
                    <th className="p-3"></th>
                    <th className="p-3">
                      <TextInput
                        className="w-full"
                        placeholder="Project Name"
                        onBlur={(e) =>
                          searchFieldChanged("name", e.target.value)
                        }
                        onKeyPress={(e) => onKeyPress("name", e)}
                      />
                    </th>
                    <th className="p-3">
                      <SelectInput
                        className="w-full"
                        onChange={(e) =>
                          searchFieldChanged("status", e.target.value)
                        }
                      >
                        <option selected disabled hidden>
                          --Select Status--
                        </option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </SelectInput>
                    </th>
                    <th className="p-3"></th>
                    <th className="p-3"></th>
                    <th className="p-3"></th>
                    <th className="p-3"></th>
                  </tr>
                </thead>

                <tbody>
                  {projects.data.map((project) => (
                    <tr className="bg-white border-b" key={project.id}>
                      <td className="p-3">{project.no}</td>
                      <td className="p-3">
                        <img src={project.image_path} alt="" width={40} />
                      </td>
                      <td className="p-3">{project.name}</td>
                      <td className="p-3">
                        <span
                          className={PROJECT_STATUS_CLASS_MAP[project.status]}
                        >
                          {PROJECT_STATUS_TEXT_MAP[project.status]}
                        </span>
                      </td>
                      <td className="p-3 text-nowrap">{project.created_at}</td>
                      <td className="p-3 text-nowrap">{project.due_date}</td>
                      <td className="p-3">{project.createdBy.name}</td>
                      <td className="p-3">
                        <Link
                          href={route("projects.edit", project.id)}
                          className="font-medium text-blue-600 hover:underline mx-1"
                        >
                          Edit
                        </Link>
                        <Link
                          href={route("projects.destroy", project.id)}
                          className="font-medium text-red-600 hover:underline mx-1"
                        >
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination links={projects.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
