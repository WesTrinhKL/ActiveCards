from app.models import db, Workspace


def seed_workspace():
    # when user creates account, they should have workspace
    workspace1 = Workspace(
        name="Workspace", user_id=1
    )
    workspace2_init_directory = Workspace(
        name="Workspace", user_id=1
    )
    workspace3_init_directory = Workspace(
        name="Workspace", user_id=1
    )
    workspace2 = Workspace(
        name="Software Interviews", user_id=1
    )
    workspace3 = Workspace(
        name="App Academy", user_id=1
    )
    workspace4 = Workspace(
        name="Workspace", user_id=2
    )
    workspace5 = Workspace(
        name="History", user_id=2
    )
    workspace6 = Workspace(
        name="Workspace", user_id=3
    )
    workspace7 = Workspace(
        name="Math", user_id=3
    )
    db.session.add(workspace1)
    db.session.add(workspace2_init_directory)
    db.session.add(workspace3_init_directory)
    db.session.add(workspace2)
    db.session.add(workspace3)
    db.session.add(workspace4)
    db.session.add(workspace5)
    db.session.add(workspace6)
    db.session.add(workspace7)
    db.session.commit()


def undo_workspace():
    db.session.execute('TRUNCATE workspaces RESTART IDENTITY CASCADE;')
    db.session.commit()
