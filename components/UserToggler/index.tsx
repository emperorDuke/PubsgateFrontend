import { Listbox } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import React from 'react'
import {
  UserCategory,
  UserTogglerCallbackProps,
  UserTogglerProps,
} from './@types'

const UserToggler: React.FC<UserTogglerProps> = (props) => {
  const users: UserCategory[] = React.useMemo(
    () => [
      {
        name: 'editor view',
        value: 'editor',
        id: 1,
      },
      {
        name: 'reviewer view',
        value: 'reviewer',
        id: 2,
      },
    ],
    [],
  )

  const router = useRouter()
  const [selectedUserType, setSelectedUserType] = React.useState(users[0])

  React.useEffect(() => {
    if (typeof router.query.userType === 'string') {
      setSelectedUserType(
        users.filter((user) => user.value === router.query.userType)[0],
      )
    }
  }, [router.query.userType, setSelectedUserType, users])

  React.useEffect(() => {
    const currentPath = router.asPath
    const paths = currentPath.split('/')
    const currentUserType = paths[paths.length - 2]

    if (currentUserType !== selectedUserType.value) {
      const nextPath = currentPath.replace(
        currentUserType,
        selectedUserType.value,
      )

      router.replace(router.pathname, nextPath)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUserType])

  const call = (c: (args: UserTogglerCallbackProps) => React.ReactNode) => {
    return c({
      userType: selectedUserType.value,
    })
  }

  return (
    <>
      <div className="flex flex-nowrap items-center mb-6">
        {props.headings}
        <div className="grow" />
        <Listbox
          value={selectedUserType}
          onChange={setSelectedUserType}
          as="div"
        >
          <Listbox.Button className="border border-transparent py-2 px-6 rounded-3xl capitalize text-white bg-secondary hover:bg-secondary-light active:border-border-col flex flex-nowrap items-center">
            {selectedUserType.name}
            <ChevronDownIcon className="w-4 h-4 ml-6" />
          </Listbox.Button>
          <Listbox.Options className="absolute bg-white z-50 w-48 mt-3 border border-gray-200 drop-shadow-lg shadow-xl rounded-lg">
            {users.map((user) => (
              <Listbox.Option key={user.id} value={user} as={React.Fragment}>
                {({ active, selected }) => (
                  <li
                    className={`flex flex-nowrap items-center p-3 capitalize first:rounded-t-lg last:rounded-b-lg ${
                      active ? 'bg-secondary text-white' : 'bg-white text-black'
                    }`}
                  >
                    <div
                      className={`bg-green-500 rounded-full p-1 block mr-3 flex flex-nowrap items-center ${
                        selected ? 'bg-green-500' : 'bg-border-col'
                      }`}
                    >
                      <CheckIcon className="text-white w-3 h-3" />
                    </div>
                    {user.name}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
      {props.children && call(props.children)}
    </>
  )
}

export default UserToggler
