# JustChat dev tasks. Run `just <task>`.

# Build the whole workspace.
build:
    cargo build

# Build only the headless protocol crate (fast; no gpui).
build-acp:
    cargo build -p acpc_protocol

# Run all tests.
test:
    cargo test

# Run only the protocol crate tests (fast).
test-acp:
    cargo test -p acpc_protocol

# Lint.
clippy:
    cargo clippy --all-targets -- -D warnings

# Format.
fmt:
    cargo fmt --all

# Check formatting without writing.
fmt-check:
    cargo fmt --all -- --check

# Run the GPUI app.
run:
    cargo run -p acpc_app

# Headless protocol examples.
example-spawn:
    cargo run -p acpc_protocol --example spawn

example-handshake:
    cargo run -p acpc_protocol --example handshake

example-chat:
    cargo run -p acpc_protocol --example chat -- "hello"

example-bridge:
    cargo run -p acpc_protocol --example bridge

# Build the production frontend + signed .app and DMG.
# Detaches stale DMG volumes first so bundle_dmg.sh's Finder-prettify step
# (which runs under `set -e`) doesn't fail on a leftover mount.
bundle:
    cd crates/acpc_app/ui && npm run build
    -for v in /Volumes/dmg.* /Volumes/JustChat*; do [ -e "$v" ] && hdiutil detach "$v" -force >/dev/null 2>&1 || true; done
    -rm -f target/release/bundle/macos/rw.*.dmg
