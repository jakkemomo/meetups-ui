interface IInputProps {
  onChange?: () => void;
  HTMLType: 'email' | 'text' | 'password';
  iconType?: 'person' | 'mail' | 'password';
  name: string;
  value: string;
  placeholder?: string;
  extraClass?: string
}

export function Input({ onChange, HTMLType, iconType, name, value, placeholder, extraClass }: IInputProps) {
  return (
    <div className={`w-80 bg-custom-gray rounded-[10px] ${extraClass}`}>
      <div className='flex items-center w-full h-50 overflow-hidden p-3.5'>
        {iconType &&
          <div
            className='w-6 h-6 bg-center bg-no-repeat'
            style={{ backgroundImage: `url("/images/${iconType}.svg")` }}
          />}
        <input
          onChange={onChange}
          type={HTMLType}
          name={name}
          value={value}
          placeholder={placeholder}
          className="h-full w-full outline-none text-black bg-custom-gray px-3 text-lg font-normal"
        />
        {(HTMLType === 'password') &&
          <div
            className='w-6 h-6 bg-center bg-no-repeat'
            style={{ backgroundImage: `url("/images/show.svg")` }}
          />}
      </div>
    </div>
  )
}
