import NewPlayerForm from '@renderer/components/new-player-form'

export default function AddPlayer(): JSX.Element {
    return (
        <div className="flex flex-col mt-10 text-2xl ">
            <NewPlayerForm />
        </div>
    )
}
