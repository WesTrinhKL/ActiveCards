from app.models import db, Workspace


def seed_workspace():
    # when user creates account, they should have workspace
    workspace1 = Workspace(
        name="Home", user_id=1
    )
    workspace2 = Workspace(
        name="Software Interviews", user_id=1
    )
    workspace3 = Workspace(
        name="App Academy", user_id=1
    )

    db.session.add(workspace1)
    db.session.add(workspace2)
    db.session.add(workspace3)
    db.session.commit()

def undo_workspace():
    db.session.execute('TRUNCATE workspaces RESTART IDENTITY CASCADE;')
    db.session.commit()
