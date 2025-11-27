interface LayoutProps {
    children: React.ReactNode;
}

const layout = ({children}: LayoutProps) => {
  return (
    <div className='bg-slate-100 h-screen w-screen p-4 flex items-center justify-center'>
        {children}
    </div>
  )
}

export default layout